import { EventBus } from './event-bus';

describe('EventBus', () => {
  it('should create an instance', () => {
    expect(new EventBus()).toBeTruthy();
  });
});
