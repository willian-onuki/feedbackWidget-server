import express from 'express';
import { NodeMailerAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository';
import { SubmitFeedbackUseCase } from './use-cases/submit-feedback-use-case';

export const routes = express.Router();



routes.post("/feedbacks", async (req, res) => {
  const { type, comment, screenshot } = req.body;
  console.log("🚀 ~ file: routes.ts ~ line 12 ~ routes.post ~ screenshot", screenshot)
  const prismaFeedbacksRepository = new PrismaFeedbacksRepository()
  const nodeMailerAdapter = new NodeMailerAdapter();
  const submitFeedbackUseCase = new SubmitFeedbackUseCase(
    prismaFeedbacksRepository,
    nodeMailerAdapter
  );

  await submitFeedbackUseCase.execute({
    type,
    comment,
    screenshot,
  })


  return res.status(201).send();
})
