module Api
  module V1
    class CommentsController < BaseController
      load_and_authorize_resource only: :destroy

      def create
        @comment = Comment.new(comment_params)

        if @comment.save
          Attachment.where(id: params[:attachments])
                    .update_all(comment_id: @comment.id)
          render json: @comment
        else
          render_errors(@comment.errors, :unprocessable_entity)
        end
      end

      def destroy
        render json: @comment.destroy
      end

      private

      def comment_params
        params.require(:comment).permit(:text, :task_id)
      end
    end
  end
end
