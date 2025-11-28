export class StatusTransitionPolicy {
  canTransition(from: string, to: string): boolean {
    return true;
  }
}
