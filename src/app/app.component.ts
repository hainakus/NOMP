import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ApiService} from "./core/api.service";
import {delay, filter, interval, map, Observable, of, switchMap, tap} from "rxjs";
import * as d3 from "d3";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'NOMPA7';
  pool$: Observable<any>;
  ergoPrice$: Observable<any>;
  pie: any;
  colors: any[] = [];
  workers: [string, unknown][] = [];
  hashrate$: Observable<any>;
  constructor(private api:ApiService) {
    this.pool$ =  interval(2000).pipe(switchMap(_ => this.api.getStats().pipe(map( data => data.pop().pools.ergo))))

    this.hashrate$ = interval(2000).pipe(switchMap(_ => this.api.getStats().pipe(map( data => { const result =  data.pop().pools.ergo.hashrate; return (result / 10000000000).toFixed(2)}))))
    this.ergoPrice$ = interval(20000).pipe(switchMap(_ => this.api.getErgoPrice().pipe(map( data => data.data.coins[0]))))
    this.hashrate$.subscribe(console.log)
  }

  ngOnInit(): void {
    this.ergoPrice$ =  this.api.getErgoPrice().pipe(map( data => data.data.markets[0]))
    this.ergoPrice$.subscribe(console.log)
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
    document.body.classList.toggle('dark-theme', true);
    this.api.getWorkersStats().pipe(map( data => Object.entries(data.pools.ergo.workers))).pipe(tap( data => {
      let that = this;
      this.workers = data;
      (function (d3) {
        "use strict";

        var
          svg: any,
          color: any,
          arc:  any,
          g:any,
          pie: (arg0: any) => any;

        setup();
        update(generateData(data));
        setInterval(function() {
          update(generateData(data));
        }, 1000);

        function setup() {
          var
            height = 500,
            width  = 720,
            radius = Math.min(height, width) / 2;

          svg = d3.select('#body').append('svg')
            .attr('width', width)
            .attr('height', height)
          g = svg.append('g').attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

          // @ts-ignore
          color = d3.scaleLinear([ Math.max(...generateData(data)), 0],['rgba(255,0,0,.5)', 'rgba(0,0,0,0.9)']);


          arc = d3.arc()
            .outerRadius(radius - 10)
            .innerRadius(0);

          // @ts-ignore
          pie = d3.pie()
            .sort(null);


        }

        function update(datas: number[]) {
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
            });

          arci.append('text')
            .attr('transform', function(d: any) {
              return 'translate(' + label.centroid(d) + ')';
            })
            .attr('dy', '0.35em')
            .text(function(d:  any) { const obj = data.find( (e:any) => e[1].shares === d.value); return obj? obj[0].split('.')[1]: '' })
            .style('fill', 'white')



          path.exit().remove();
        }

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

            datas.push(workers[i][1].shares);
          }

          return datas;
        }
      })(d3)})).subscribe(console.log)

  }

  ngAfterViewInit(): void {

  }
}
