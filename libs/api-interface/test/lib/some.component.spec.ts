import { Component } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { SomeComponent } from '../../src/lib/some.component';

describe('AppComponent', () => {
  it('A library should create the app', () => {
    const fixture = new SomeComponent()
    expect(fixture).toBeDefined();
  });
});
