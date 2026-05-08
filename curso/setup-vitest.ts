// setup-vitest.ts
import { TestBed } from '@angular/core/testing';
import {
  BrowserTestingModule,
  platformBrowserTesting
} from '@angular/platform-browser/testing';

// Inicializa el entorno de Angular una sola vez
TestBed.initTestEnvironment(
  BrowserTestingModule,
  platformBrowserTesting()
);
