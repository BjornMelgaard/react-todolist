module Api
  module V1
    class ProjectsController < BaseController
      load_and_authorize_resource only: %i[update destroy]

      def create
        @project = current_user.projects.create(project_params)
        if @project.persisted?
          render json: @project, status: :created
        else
          render_errors(@project.errors, :unprocessable_entity)
        end
      end

      def update
        if @project.update(project_params)
          render json: @project, status: :created
        else
          render_errors(@project.errors, :unprocessable_entity)
        end
      end

      def destroy
        render json: @project.destroy
      end

      private

      def project_params
        params.require(:project).permit(:name)
      end
    end
  end
end
