module Api
  module V1
    class TasksController < BaseController
      load_and_authorize_resource only: %i[update destroy done sort deadline]

      def create
        @task = Task.create(task_params)
        if @task.persisted?
          render json: @task, status: :created
        else
          render_errors(@task.errors, :unprocessable_entity)
        end
      end

      def update
        if @task.update(task_params)
          render json: @task, status: :ok
        else
          render_errors(@task.errors, :unprocessable_entity)
        end
      end

      def destroy
        render json: @task.destroy
      end

      def done
        @task.update(done: task_params[:done])
        render json: @task
      end

      def sort
        @task.move_by_delta(task_params[:delta].to_i)
        render json: @task
      rescue ArgumentError => e
        render_errors({ delta: e.message }, :unprocessable_entity)
      end

      def deadline
        @task.update(deadline: task_params[:deadline])
        render json: @task
      end

      private

      def task_params
        params.require(:task).permit(:name, :project_id, :done, :delta, :deadline)
      end
    end
  end
end
