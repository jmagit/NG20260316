import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';

export const ERROR_LEVEL = new InjectionToken<string>('ERROR_LEVEL')

@Injectable({ providedIn: 'root' })
export class LoggerService {
  private readonly nivel: number

  constructor(@Optional() @Inject(ERROR_LEVEL) nivel?: number) {
    this.nivel = nivel ?? 99
  }
  public error(msg: string): void {
    if (this.nivel > 0)
      console.error(msg)
  }
  public warn(msg: string): void {
    if (this.nivel > 1)
      console.warn(msg)
  }
  public info(msg: string): void {
    if (this.nivel > 2) {
      if (console.info)
        console.info(msg)
      else
        console.log(msg)
    }
  }
  public log(msg: string): void {
    if (this.nivel > 3)
      console.log(msg)
  }

}
