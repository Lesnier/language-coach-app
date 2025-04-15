import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApiService } from 'src/app/services/api.service';
import { SchedulePage } from './schedule.page';

describe('SchedulePage', () => {
  let component: SchedulePage;
  let fixture: ComponentFixture<SchedulePage>;
  let api: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService],
    });

    fixture = TestBed.createComponent(SchedulePage);
    component = fixture.componentInstance;
    api = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no haya solicitudes pendientes
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get availabilities', () => {
    const mockLoginResponse = { access_token: 'mockAccessToken' };
    const mockAvailabilityResponse = {
      data: [{ date: 1, start_time: '09:00' }],
    }; // Simula la respuesta de disponibilidad

    // Simula la llamada de inicio de sesión
    api.login('carlos@mail.com', 'password').subscribe((res) => {
      expect(res.access_token).toBe(mockLoginResponse.access_token);

      // Llama a getAvailabilities después de iniciar sesión
      api
        .getAvailabilities(res.access_token)
        .subscribe((availabilityRes: { data: string | any[] }) => {
          expect(availabilityRes.data).toBeDefined();
          expect(availabilityRes.data.length).toBeGreaterThan(0);
          expect(availabilityRes.data[0].date).toBeDefined();
          expect(availabilityRes.data[0].start_time).toBeDefined();
        });
    });

    // Simula la respuesta de inicio de sesión
    const loginReq = httpMock.expectOne(api.apiUrl + '/login'); // Reemplaza con la URL real de la API
    expect(loginReq.request.method).toBe('POST');
    loginReq.flush(mockLoginResponse); // Simula la respuesta de la API de inicio de sesión

    // Simula la respuesta de disponibilidad
    const availabilityReq = httpMock.expectOne(api.apiUrl + '/availabilities'); // Reemplaza con la URL real de la API de disponibilidades
    expect(availabilityReq.request.method).toBe('GET');
    availabilityReq.flush(mockAvailabilityResponse); // Simula la respuesta de la API de disponibilidades
  });
});
