module Api
  module V1
    class BaseController < ActionController::Base
      protect_from_forgery with: :null_session

      before_action :authenticate_user!

      rescue_from CanCan::AccessDenied do |_|
        render_errors({ message: 'Access denied' }, :unauthorized)
      end

      rescue_from ActiveRecord::RecordNotFound do |_|
        render_errors({ message: 'Record not found' }, :not_found)
      end

      def render_errors(errors, status)
        render json: { errors: errors }, status: status
      end
    end
  end
end
