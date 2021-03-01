import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { SensorData } from 'src/app/model/sensor-data.model';
import { compareAsc, compareDesc } from 'date-fns';
var TimSort = require('timsort');

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit, OnChanges {

  @Input() sensorData: SensorData[] = [];
  @Input() originalSensorData: SensorData[] = [];

  sortColumn = 'DATE';
  sortDirection = 'ASC';

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
  }

  filterResults(keyboardEvent: any): void {
    const searchTerm = keyboardEvent.target.value.toLowerCase();
    this.sensorData = this.originalSensorData.slice(0);

    if (!!searchTerm) {
      this.sensorData = this.sensorData.filter( data => data.sensor_type.toLowerCase().includes(searchTerm) || data.name.toLowerCase().includes(searchTerm));
    }
  }

  sortByDate(): void {
    this.sortDirection = this.sortColumn === 'DATE' && this.sortDirection === 'ASC' ? this.sortDirection = 'DESC' : this.sortDirection = 'ASC';
    this.sortColumn = 'DATE';

    if (this.sortDirection === 'ASC') {
      TimSort.sort(this.sensorData, this.dateAscCompare);
    } else if (this.sortDirection === 'DESC') {
      TimSort.sort(this.sensorData, this.dateDescCompare);
    }
  }

  sortBySensorType(): void {
    this.sortDirection = this.sortColumn === 'SENSOR_TYPE' && this.sortDirection === 'ASC' ? this.sortDirection = 'DESC' : this.sortDirection = 'ASC';
    this.sortColumn = 'SENSOR_TYPE';

    if (this.sortDirection === 'ASC') {
      TimSort.sort(this.sensorData, this.sensorTypeAscCompare);
    } else if (this.sortDirection === 'DESC') {
      TimSort.sort(this.sensorData, this.sensorTypeDescCompare);
    }
  }

  dateAscCompare(a: SensorData, b: SensorData): number {
    return compareAsc(new Date(a.reading_ts), new Date(b.reading_ts));
  }

  dateDescCompare(a: SensorData, b: SensorData): number {
    return compareDesc(new Date(a.reading_ts), new Date(b.reading_ts));
  }

  sensorTypeAscCompare(a: SensorData, b: SensorData): number {
    return a.sensor_type.toLocaleLowerCase().localeCompare(b.sensor_type.toLocaleLowerCase());
  }
  sensorTypeDescCompare(a: SensorData, b: SensorData): number {
    return b.sensor_type.toLocaleLowerCase().localeCompare(a.sensor_type.toLocaleLowerCase());
  }

}
