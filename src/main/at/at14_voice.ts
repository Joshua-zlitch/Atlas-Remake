export class AT14VoiceHandler {
  public listen(): { success: false; error: { code: string; message: string } } {
    return {
      success: false,
      error: {
        code: 'CAPABILITY_UNAVAILABLE',
        message: 'AT-14 Voice runtime integration is scheduled for local engine binding in a future phase',
      },
    };
  }
}
