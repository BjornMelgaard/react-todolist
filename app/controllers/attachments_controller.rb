class AttachmentsController < ApplicationController
  def create
    @attachment = Attachment.new(file: params[:file])
    if @attachment.save
      render json: @attachment.to_json
    else
      render json: { errors: @attachment.errors }, status: :unprocessable_entity
    end
  end
end
