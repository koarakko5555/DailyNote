module Api::V1
    class PlansController < ApplicationController
      before_action :set_plan, only: %i[show update destroy]
  
      def index
        render json: Plan.all.order(start_date: :asc)
      end
  
      def show
        render json: @plan
      end
  
      def create
        plan = Plan.new(plan_params)
        if plan.save
          render json: plan, status: :created
        else
          render json: { errors: plan.errors.full_messages }, status: :unprocessable_entity
        end
      end
  
      def update
        if @plan.update(plan_params)
          render json: @plan
        else
          render json: { errors: @plan.errors.full_messages }, status: :unprocessable_entity
        end
      end
  
      def destroy
        @plan.destroy
        head :no_content
      end
  
      private
  
      def set_plan
        @plan = Plan.find(params[:id])
      end
  
      def plan_params
        params.require(:plan).permit(:title, :start_date, :end_date, :content)
      end
    end
  end