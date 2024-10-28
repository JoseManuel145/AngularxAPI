import { PricePipe } from "./PricePipe.pipe";

describe('CustomPipe', () => {
  it('create an instance', () => {
    const pipe = new PricePipe();
    expect(pipe).toBeTruthy();
  });
});
