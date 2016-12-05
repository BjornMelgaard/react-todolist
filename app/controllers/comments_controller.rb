class CommentsController < ApplicationController
  def create
    @comment = Comment.new(comment_params)

    if @comment.save
      Attachment
        .where(id: params[:attachments])
        .update_all(comment_id: @comment.id)
      render json: @comment
    else
      render json: { errors: @comment.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    @comment = Comment.find(params[:id])
    render json: @comment.destroy
  end

  private

  def comment_params
    params.require(:comment).permit(:text, :task_id)
  end
end
