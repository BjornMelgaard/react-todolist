class ProjectsController < ApplicationController
  def index
    @projects = current_user.projects_with_nestings
  end
end
