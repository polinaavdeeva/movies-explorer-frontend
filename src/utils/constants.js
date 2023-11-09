export const CARD_LAPTOP = 16;
export const CARD_LAPTOP_MORE = 4;

export const CARD_TABLET = 8;
export const COUNT_MOVIES_TABLET_MORE = 2;

export const COUNT_MOBILE = 5;
export const COUNT_MOVIES_MOBILE_MORE = 2;

export const SHORT_DURATION = 40;

export const namePattern = /^[A-Za-zА-Яа-яЁё \\-]+$/;
export const emailPattern = /^[\w.-]+@[a-zA-Z_-]+?(?:\.[a-zA-Z]{2,})+$/;

export const registerOptions = {
  name: {
    required: "Обязательное поле",
    minLength: {
      value: 2,
      message: "Имя не может быть меньше 2 символов",
    },
    maxLength: {
      value: 30,
      message: "Имя не может быть больше 30 символов",
    },
    pattern: {
      message: "Неправильный формат",
      value: namePattern,
    },
  },
  email: {
    required: "Обязательное поле",
    pattern: {
      message: "Неправильный формат",
      value: emailPattern,
    },
  },
  password: {
    required: "Обязательное поле",
    minLength: {
      value: 6,
      message: "Пароль не может быть меньше 6 символов",
    },
    maxLength: {
      value: 30,
      message: "Пароль не может быть больше 30 символов",
    },
  },
};
