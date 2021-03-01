import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SensorData } from 'src/app/model/sensor-data.model';

@Component({
  selector: 'app-dashboard-container',
  templateUrl: './dashboard.container.html',
  styleUrls: ['./dashboard.container.scss']
})
export class DashboardContainer implements OnInit {

  sensorData: SensorData[] = [];
  stringArray: string[] = [];
  fileReader = new FileReader();
  isLoading = false;
  lineNumber = 0;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.http.get('/assets/sensor_readings.json', { responseType: 'blob' })
      .subscribe(res => {
        this.fileReader.onloadend = () => {
          const temp = this.fileReader.result as string;
          this.stringArray = temp?.split('\n');
          this.parseAsSensorDataArray();
        }

        this.fileReader.readAsText(res); 
      });
  }

  parseAsSensorDataArray(): void {
    this.stringArray.forEach( (line, index) => {
      if (index === 0) this.isLoading = true;
      if (index === this.stringArray.length - 1) this.isLoading = false;
      if (this.isLineValid(line)) {
        const parsedLine = JSON.parse(line);
        this.sensorData.push(parsedLine)
      }
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
