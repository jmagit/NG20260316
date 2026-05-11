import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibrosList, LibrosAdd, LibrosEdit, LibrosView } from './componentes';
import { BibliotecaViewModelService } from './servicios';
import { ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { Component, input, signal, output } from '@angular/core';

@Component({
  selector: 'app-paginator',
  template: '',
  standalone: true
})
class PaginatorStub {
  readonly page = input(0, { alias: 'current-page' });
  readonly pages = input(0, { alias: 'total-pages' });
  readonly pageChange = output<number>({ alias: 'page-change' });
}

describe('Biblioteca Módulo: Componentes', () => {
  let vmMock: any;

  beforeEach(() => {
    vmMock = {
      load: vi.fn(),
      add: vi.fn(),
      edit: vi.fn(),
      view: vi.fn(),
      clear: vi.fn(),
      cancel: vi.fn(),
      send: vi.fn(),
      delete: vi.fn(),
      pageChange: vi.fn(),
      Modo: signal('list'),
      Listado: signal([]),
      Elemento: signal({ id: 0, titulo: '', autor: '' }),
      page: signal({ number: 0, totalPages: 0 }),
      auth: {
        isAuthenticated: signal(true)
      }
    };
  });

  describe('LibrosList', () => {
    let component: LibrosList;
    let fixture: ComponentFixture<LibrosList>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [LibrosList],
        providers: [
          { provide: BibliotecaViewModelService, useValue: vmMock },
          { provide: ActivatedRoute, useValue: { paramMap: of(convertToParamMap({})) } }
        ]
      }).overrideComponent(LibrosList, {
        set: { imports: [PaginatorStub] }
      }).compileComponents();

      fixture = TestBed.createComponent(LibrosList);
      component = fixture.componentInstance;
    });

    it('should call VM.load on init with page input', () => {
      fixture.componentRef.setInput('page', 2);
      fixture.detectChanges();
      expect(vmMock.load).toHaveBeenCalledWith(2);
    });

    it('should call VM.clear on destroy', () => {
      fixture.destroy();
      expect(vmMock.clear).toHaveBeenCalled();
    });
  });

  describe('LibrosAdd', () => {
    let component: LibrosAdd;
    let fixture: ComponentFixture<LibrosAdd>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [LibrosAdd],
        providers: [
          { provide: BibliotecaViewModelService, useValue: vmMock }
        ]
      }).compileComponents();

      fixture = TestBed.createComponent(LibrosAdd);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should call VM.add on init', () => {
      expect(vmMock.add).toHaveBeenCalled();
    });
  });

  describe('LibrosEdit', () => {
    let component: LibrosEdit;
    let fixture: ComponentFixture<LibrosEdit>;
    let routerMock: any;

    beforeEach(async () => {
      routerMock = { navigate: vi.fn() };
      await TestBed.configureTestingModule({
        imports: [LibrosEdit],
        providers: [
          { provide: BibliotecaViewModelService, useValue: vmMock },
          { provide: Router, useValue: routerMock },
          {
            provide: ActivatedRoute,
            useValue: { paramMap: of(convertToParamMap({ id: '123' })) }
          }
        ]
      }).compileComponents();

      fixture = TestBed.createComponent(LibrosEdit);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should call VM.edit with id from route', () => {
      expect(vmMock.edit).toHaveBeenCalledWith(123);
    });
  });

  describe('LibrosView', () => {
    let component: LibrosView;
    let fixture: ComponentFixture<LibrosView>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [LibrosView],
        providers: [
          { provide: BibliotecaViewModelService, useValue: vmMock },
          { provide: Router, useValue: {} },
          { provide: ActivatedRoute, useValue: { paramMap: of(convertToParamMap({})) } }
        ]
      }).compileComponents();

      fixture = TestBed.createComponent(LibrosView);
      component = fixture.componentInstance;
    });

    it('should call VM.view with id from input', () => {
      fixture.componentRef.setInput('id', '456');
      fixture.detectChanges();
      expect(vmMock.view).toHaveBeenCalledWith(456);
    });
  });
});
