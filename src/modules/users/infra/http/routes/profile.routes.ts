import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import ProfileController from '../controllers/ProfileController';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(ensureAuthenticated);
profileRouter.get('/', profileController.show);
profileRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string(),
      password_confirmation: Joi.string().valid(Joi.ref('password')),
      old_password: Joi.when('password', {
        is: Joi.exist(),
        then: Joi.string().required(),
        otherwise: Joi.object({
          old_password: Joi.forbidden(),
        }),
      }),
    }),
  }),
  profileController.update,
);

export default profileRouter;
