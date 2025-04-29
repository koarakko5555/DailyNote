class Api::V1::DiariesController < ApplicationController
  before_action :authenticate_user! # ✅ ログイン必須にする
  before_action :set_diary, only: [:show, :update, :destroy] # ✅ 日記取得処理まとめる

  def index
    render json: current_user.diaries
  end

  def show
    render json: @diary
  end

  def create
    diary = current_user.diaries.build(diary_params) # ✅ ユーザーに紐づけて新規作成
    if diary.save
      render json: diary, status: :created
    else
      render json: { errors: diary.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @diary.update(diary_params)
      render json: @diary
    else
      render json: { errors: @diary.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @diary.destroy
    head :no_content
  end

  private

  def set_diary
    @diary = current_user.diaries.find(params[:id]) # ✅ ログインユーザーの日記だけを探す
  rescue ActiveRecord::RecordNotFound
    render json: { error: "日記が見つかりません" }, status: :not_found
  end

  def diary_params
    params.require(:diary).permit(:title, :content, :date)
  end
end