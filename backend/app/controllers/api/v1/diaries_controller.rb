class Api::V1::DiariesController < ApplicationController
    def index
      diaries = Diary.all
      render json: diaries
    end
  end