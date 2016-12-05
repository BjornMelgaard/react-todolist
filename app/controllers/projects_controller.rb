class ProjectsController < ApplicationController
  before_action :set_project, only: [:update, :destroy]

  def index
    @projects = current_user.projects_with_nestings
  end

  def create
    @project = current_user.projects.create(project_params)
    if @project.persisted?
      render json: @project, status: :created
    else
      render json: { errors: @project.errors }, status: :unprocessable_entity
    end
  end

  def update
    if @project.update(project_params)
      render json: @project, status: :created
    else
      render json: { errors: @project.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    render json: @project.destroy
  end

  private

  def set_project
    @project = Project.find(params[:id])
  end

  def project_params
    params.require(:project).permit(:name)
  end
end
