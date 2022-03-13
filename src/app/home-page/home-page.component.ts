import { Component, OnInit } from '@angular/core';
import {ApiService} from "../core/api.service";
import {interval, map, switchMap, tap} from "rxjs";
import * as d3 from "d3";
import {MinersQuery} from "../core/store/miners.query";
import {Miner} from "../core/store/miner.model";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  miners: any;

  constructor(private api:MinersQuery) { }

  ngOnInit(): void {
    this.api.getTopMiners().pipe(tap( data => {
      let that = this;
       this.miners = data;
      (function (d3) {
        "use strict";

        var
          svg: any,
          color: any,
          arc:  any,
          g:any,
          pie: (arg0: any) => any;

        setup();
        update();
        interval(2000).pipe( switchMap(_ => that.api.getTopMiners())).subscribe( e => {
          that.miners = e
          update();
        });

        function setup() {
          var
            height = 500,
            width  = 720,
            radius = Math.min(height, width) / 2;

          svg = d3.select('#body').append('svg').attr('class', 'glass')
            .attr('width', width)
            .attr('height', height)
          g = svg.append('g').attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

          // @ts-ignore
          color = d3.scaleLinear([ Math.max(...generateData(data)), 0],[' rgba(0,0,0,.02)', ' rgba(255,255,255,.02)']);


          arc = d3.arc()
            .outerRadius(radius - 10)
            .innerRadius(0);

          // @ts-ignore
          pie = d3.pie()
            .sort(null);


        }

        function update() {
          const datas = generateData(that.miners)
          var path = svg.selectAll('path')
            .data(pie(datas));

          path
            .transition()
            .duration(500)
            .attrTween('d', arcTween);

          path.enter()
            .append('path')
            .style('fill', function(d:any) { return color(d.value); })
            .attr('d', arc)
            .each(stash).append("g")
            .attr("class", "label");
          var
            height = 500,
            width  = 720,
            radius = Math.min(height, width) / 2;
          const label = d3.arc()
            .outerRadius(radius - 40)
            .innerRadius(radius - 40);

          const arci = g.selectAll('.arc')
            .data(pie(datas))
            .enter().append('g')
            .attr('class', 'arc');

          arci.append('path')
            .attr('d', path)
            .attr('fill', function(d: any) {
              return color(d.value);
            })
            .attr('stroke', function (d:any) {
              return 'var(--btn-bg-color)'
            }).attr('stroke-width', function (d:any) { return 3 });

          arci.append('text')
            .attr('transform', function(d: any) {
              return 'translate(' + label.centroid(d) + ')';
            })
            .attr('dy', '0.35em')
            .text((d:  any) => { const obj:Miner = that.miners.find( (e:any) => e.shares === d.value); return obj? obj.id : '' })
            .attr('font-size', '.64em')
            .style('fill', 'white')


          arci.exit().remove();
          path.exit().remove();

        }
        window.addEventListener('resize', update );
        function arcTween(this: any, a: any) {
          var i = d3.interpolate(this._current, a);
          this._current = i(0);
          return function(t: any) {
            return arc(i(t));
          };
        }

        function stash(this: any, d: any) {
          this._current = d;
        }

        function generateData(workers: any ) {
          var
            datas = [],
            i;

          for(i = 0; i < workers.length; i++) {

            datas.push(workers[i].shares);
          }

          return datas;
        }
      })(d3)})).subscribe(console.log)

  }

}
