import { SubmitFeedbackUseCase } from "./submit-feedback-use-case"

// jest.fn() is a spy function that verifies if the function are called
const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

// Passsing false dependencies to test the execute function on submit use-case
const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy }
)

// Creating many test for a single functionality
describe('Submit feedback', () => {
  it('should be able to submit a feedback', async () => {
    // expects to resolve without error
    // resolves: to hope it solves
    // not.toThrow(): not return any errors
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'comment',
      screenshot: 'data:image/png;base64',
    })).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it('should not be able to submit a feedback without type', async () => {
    // rejects: to hope it rejects
    // toThrow(): to hope it returns a error
    await expect(submitFeedback.execute({
      type: '',
      comment: 'comment',
      screenshot: 'data:image/png;base64',
    })).rejects.toThrow();
  });

  it('should not be able to submit a feedback without comment', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: '',
      screenshot: 'data:image/png;base64',
    })).rejects.toThrow();
  });

  it('should not be able to submit a feedback without an invalid screenshot', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'comment',
      screenshot: 'teste.jpg',
    })).rejects.toThrow();
  });
})
