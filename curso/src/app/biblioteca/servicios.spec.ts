import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { BibliotecaDAOService, BibliotecaViewModelService, LibroModel } from './servicios';
import { NotificationService, NavigationService } from '../common-services';
import { AuthService } from '../security';
import { LoggerService } from 'src/lib/my-library';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.development';
import { of, throwError } from 'rxjs';

describe('Biblioteca Módulo: Servicios', () => {
  describe('BibliotecaDAOService', () => {
    let service: BibliotecaDAOService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          provideHttpClient(),
          provideHttpClientTesting(),
          BibliotecaDAOService
        ]
      });
      service = TestBed.inject(BibliotecaDAOService);
      httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
      httpMock.verify();
    });

    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should fetch a page of books', () => {
      const mockResponse = {
        number: 1,
        totalPages: 5,
        totalElements: 100,
        content: [{ id: 1, titulo: 'Test', autor: 'Author' }]
      };

      service.page(1, 10).subscribe(data => {
        expect(data.page).toBe(1);
        expect(data.pages).toBe(5);
        expect(data.rows).toBe(100);
        expect(data.list.length).toBe(1);
      });

      const req = httpMock.expectOne(`${environment.apiURL}biblioteca?_page=1&_rows=10&_sort=nombre,apellidos`);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  });

  describe('BibliotecaViewModelService', () => {
    let service: BibliotecaViewModelService;
    let daoMock: any;
    let notifyMock: any;
    let navigationMock: any;
    let authMock: any;
    let loggerMock: any;
    let routerMock: any;

    beforeEach(() => {
      daoMock = {
        query: vi.fn(),
        get: vi.fn(),
        add: vi.fn(),
        change: vi.fn(),
        remove: vi.fn(),
        page: vi.fn(),
      };
      notifyMock = { add: vi.fn() };
      navigationMock = { back: vi.fn() };
      authMock = { isAutenticated: true };
      loggerMock = { error: vi.fn() };
      routerMock = { navigate: vi.fn() };

      TestBed.configureTestingModule({
        providers: [
          BibliotecaViewModelService,
          { provide: BibliotecaDAOService, useValue: daoMock },
          { provide: NotificationService, useValue: notifyMock },
          { provide: NavigationService, useValue: navigationMock },
          { provide: AuthService, useValue: authMock },
          { provide: LoggerService, useValue: loggerMock },
          { provide: Router, useValue: routerMock },
        ]
      });
      service = TestBed.inject(BibliotecaViewModelService);
    });

    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('load() should update list and mode', () => {
      const mockData = { page: 0, pages: 1, rows: 1, list: [{ id: 1, titulo: 'Libro', autor: 'Autor' }] };
      daoMock.page.mockReturnValue(of(mockData));

      service.load(0);

      expect(daoMock.page).toHaveBeenCalled();
      expect(service.Listado()).toEqual(mockData.list);
      expect(service.Modo()).toBe('list');
      expect(service.page().totalRows).toBe(1);
    });

    it('add() should reset element and set mode to add', () => {
      service.Elemento.set({ id: 99, titulo: 'Old', autor: 'Old' });
      service.add();
      expect(service.Elemento().id).toBe(0);
      expect(service.Modo()).toBe('add');
    });

    it('edit() should fetch element and set mode to edit', () => {
      const mockLibro = { id: 1, titulo: 'Libro', autor: 'Autor' };
      daoMock.get.mockReturnValue(of(mockLibro));

      service.edit(1);

      expect(daoMock.get).toHaveBeenCalledWith(1);
      expect(service.Elemento()).toEqual(mockLibro);
      expect(service.Modo()).toBe('edit');
    });

    it('delete() should call remove and reload if confirmed', () => {
      vi.spyOn(window, 'confirm').mockReturnValue(true);
      daoMock.remove.mockReturnValue(of({}));
      daoMock.page.mockReturnValue(of({ page: 0, pages: 1, rows: 0, list: [] }));

      service.delete(1);

      expect(window.confirm).toHaveBeenCalled();
      expect(daoMock.remove).toHaveBeenCalledWith(1);
      expect(daoMock.page).toHaveBeenCalled();
    });

    it('send() should call add in add mode', () => {
      service.Modo.set('add');
      const mockLibro = { id: 0, titulo: 'Nuevo', autor: 'Autor' };
      service.Elemento.set(mockLibro);
      daoMock.add.mockReturnValue(of(mockLibro));

      service.send();

      expect(daoMock.add).toHaveBeenCalledWith(mockLibro);
      expect(navigationMock.back).toHaveBeenCalled();
    });

    it('handleError() should notify error message', () => {
      const errorResponse = { status: 404, statusText: 'Not Found' };
      service.handleError(errorResponse as any);
      expect(notifyMock.add).toHaveBeenCalledWith('ERROR: 404 Not Found');
    });
  });
});
