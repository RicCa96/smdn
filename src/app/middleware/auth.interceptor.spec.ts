import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';

describe('AuthInterceptor', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true
        }
      ]
    });

    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should add an Authorization header with the token', () => {
    // Arrange
    const token = null;
    const url = 'https://example.com/api/data';

    // Act
    http.get(url).subscribe();

    // Assert
    const req = httpMock.expectOne(url); // Expect a request to the specified URL
    expect(req.request.headers.has('Authorization')).toBeTruthy(); // Check if the Authorization header is present
    expect(req.request.headers.get('Authorization')).toEqual(`Bearer ${token}`); // Check if the Authorization header has the correct value
  });
});
