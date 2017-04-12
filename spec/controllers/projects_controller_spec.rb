require 'rails_helper'

RSpec.describe ProjectsController, type: :controller do
  sign_in_user

  it 'should have a current_user' do
    expect(subject.current_user).to_not be_nil
  end

  describe 'GET #index' do
    let!(:user)    { create(:user) }
    let!(:project) { create(:project, user_id: user.id) }
    let!(:task)    { create(:task, project_id: project.id) }
    let!(:comment) { create(:comment, task_id: task.id) }

    it 'returns curent users projects' do
      allow(controller).to receive(:current_user) { user }

      get :index

      expect(response.content_type).to eq 'text/html'
    end
  end
end
