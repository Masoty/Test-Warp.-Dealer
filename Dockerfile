# Используем базовый образ с Node.js
FROM node:lts AS bun-install

# Устанавливаем curl для загрузки Bun
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

# Устанавливаем Bun
RUN curl https://bun.sh/install | bash

# Указываем путь к установленному Bun в переменной окружения
ENV PATH="/root/.bun/bin:${PATH}"

# Создаем рабочую директорию для нашего приложения
WORKDIR /app

# Копируем файл package.json и другие конфигурационные файлы (если есть)
COPY package.json bun.lockb ./

# Устанавливаем зависимости через Bun
RUN bun install

# Копируем остальную часть проекта в рабочую директорию
COPY . .

# Указываем команду для запуска приложения
CMD ["bun", "src/index.ts"]

# Указываем порт, который будет прослушиваться
EXPOSE 3000