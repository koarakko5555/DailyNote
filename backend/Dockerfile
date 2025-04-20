# syntax=docker/dockerfile:1

ARG RUBY_VERSION=3.2.7
FROM ruby:$RUBY_VERSION-slim AS base

WORKDIR /app

# 必要なパッケージ（＋build-essentialをbaseにも含めておくと楽）
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y \
      curl libjemalloc2 libvips postgresql-client libyaml-dev \
      build-essential git libpq-dev pkg-config && \
    rm -rf /var/lib/apt/lists /var/cache/apt/archives

# BUNDLE設定（frozen=false に）
ENV BUNDLE_PATH="/usr/local/bundle" \
    BUNDLE_WITHOUT="development" \
    BUNDLE_FROZEN="false"

# Gemfileをコピーしてbundle install
COPY Gemfile Gemfile.lock ./
RUN bundle install && \
    gem install rails && \
    rm -rf ~/.bundle/ "$BUNDLE_PATH"/ruby/*/cache "$BUNDLE_PATH"/ruby/*/bundler/gems/*/.git && \
    bundle exec bootsnap precompile --gemfile

# アプリコードをコピー
COPY . .

# Bootsnapをプリコンパイル
RUN bundle exec bootsnap precompile app/ lib/

# Railsユーザーを作成
RUN groupadd --system --gid 1000 rails && \
    useradd rails --uid 1000 --gid 1000 --create-home --shell /bin/bash && \
    chown -R rails:rails /app /usr/local/bundle

USER rails

CMD ["bin/rails", "server", "-b", "0.0.0.0"]