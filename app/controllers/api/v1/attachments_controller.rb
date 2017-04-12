module Api
  module V1
    class AttachmentsController < BaseController
      def create
        @attachment = Attachment.new(file: params[:file])
        if @attachment.save
          render json: @attachment.to_json
        else
          render_errors(@attachment.errors, :unprocessable_entity)
        end
      end
    end
  end
end
