import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SensorData } from 'src/app/model/sensor-data.model';

import { DataTableComponent } from './data-table.component';

describe('DataTableComponent', () => {
  let component: DataTableComponent;
  let fixture: ComponentFixture<DataTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTableComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should not display the table if sensorData array is empty', () => {
    component.sensorData = [];
    fixture.detectChanges();

    const table = fixture.debugElement.query(By.css('.c-sensor-data-table'));
    expect(table).toBeNull();
  });

  it('should display the table if theres at least one element in the array', () => {
    component.sensorData = [
      {
        "id": "Box-A1-O3", 
        "box_id": "Box-A1", 
        "sensor_type": "O3", 
        "unit": "ppm", 
        "name": "Ozone", 
        "range_l": 0.0, 
        "range_u": 1000.0, 
        "longitude": -0.06507, 
        "latitude": 51.51885, 
        "reading": 672, 
        "reading_ts": new Date("2019-09-10T00:00:00")
      } as SensorData
    ];
    fixture.detectChanges();

    const table = fixture.debugElement.query(By.css('.c-sensor-data-table'));
    expect(table).toBeDefined();
  });
});
