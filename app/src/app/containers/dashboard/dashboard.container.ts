import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SensorData } from 'src/app/model/sensor-data.model';

@Component({
  selector: 'app-dashboard-container',
  templateUrl: './dashboard.container.html'
})
export class DashboardContainer implements OnInit {

  sensorData: SensorData[] = [];
  fileReader = new FileReader();
  lineNumber = 0;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.http.get('/assets/sensor_readings.json', { responseType: 'blob' })
      .subscribe(res => {
        this.fileReader.onloadend = () => {
          const temp = this.fileReader.result as string;
          const stringArray = temp?.split('\n');
          this.sensorData = stringArray.filter(line => this.isLineValid(line)).map( line => {
            const parsedLine = JSON.parse(line);
            return parsedLine as SensorData;
          })
        }

        this.fileReader.readAsText(res); 
      });
  }

  isLineValid(line: string): boolean {
    if("" === line) return false;

    try {
        JSON.parse(line);
        this.lineNumber++;
    } catch (e) {
        console.log("Couldn't parse line:", this.lineNumber);
        return false;
    }
    return true;
  }

}
