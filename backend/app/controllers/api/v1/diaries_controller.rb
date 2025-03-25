# app/controllers/api/v1/diaries_controller.rb
class Api::V1::DiariesController < ApplicationController
    def index
      render json: Diary.all
    end

    def show
        diary = Diary.find(params[:id])
        render json: diary
    end
  
    def create
      diary = Diary.new(diary_params)
      if diary.save
        render json: diary, status: :created
      else
        render json: { errors: diary.errors.full_messages }, status: :unprocessable_entity
      end
    end
  
    def update
      diary = Diary.find(params[:id])
      if diary.update(diary_params)
        render json: diary
      else
        render json: { errors: diary.errors.full_messages }, status: :unprocessable_entity
      end
    end
  
    def destroy
      diary = Diary.find(params[:id])
      diary.destroy
      head :no_content
    end
  
    private
  
    def diary_params
      params.require(:diary).permit(:title, :content, :date)
    end
  end