export class AT15VisionHandler {
  public captureScreen(): { success: false; error: { code: string; message: string } } {
    return {
      success: false,
      error: {
        code: 'CAPABILITY_UNAVAILABLE',
        message: 'AT-15 Vision runtime integration is scheduled for local engine binding in a future phase',
      },
    };
  }
}
