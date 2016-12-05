require 'rails_helper'

RSpec.describe TasksController, type: :controller do
  sign_in_user

  it 'should have a current_user' do
    expect(subject.current_user).to_not be_nil
  end

  describe 'POST #create' do
    let!(:project) { create(:project, user_id: subject.current_user.id) }

    context 'with valid attributes' do
      it 'creates a task' do
        expect {
          post :create, params: { task: attributes_for(:task, project_id: project.id) }
        }.to change(Task, :count).by(1)
      end
    end

    context 'with invalid attributes' do
      it 'does not create a task' do
        expect {
          post :create, params: { task: attributes_for(:invalid_task, project_id: project.id) }
        }.to_not change(Task, :count)
      end
    end
  end

  describe 'PATCH #update' do
    context 'with valide attributes' do
      let!(:project) { create(:project, user_id: subject.current_user.id) }
      let!(:task) { create(:task, project_id: project.id) }

      it 'updates task' do
        expect {
          patch :update, params: { id: task, task: attributes_for(:task) }
        }.to_not change(Task, :count)
      end

      it 'return object json' do
        patch :update, params: { id: task, task: attributes_for(:task) }
        expect(response.body.strip).to_not be_empty
      end
    end
  end

  describe 'DELETE #destroy' do
    let!(:project) { create(:project, user_id: subject.current_user.id) }
    let!(:task) { create(:task, project_id: project.id) }

    it 'deletes task' do
      expect {
        delete :destroy, params: { id: task }
      }.to change(Task, :count).by(-1)
    end
  end

  describe 'PUT #done' do
    let!(:project) { create(:project, user_id: subject.current_user.id) }
    let!(:task) { create(:task, project_id: project.id) }

    it 'mark the task as done' do
      put :done, params: { id: task, task: attributes_for(:task_done) }
      task.reload

      expect(task.done).to eq true
    end
  end

  describe 'PUT #sort' do
    let!(:project) { create(:project, user_id: subject.current_user.id) }
    let!(:tasks) { create_list(:task, 2, project_id: project.id) }

    it 'change tasks priority' do
      tasks_before = Task.all.order('position').pluck(:id)
      put :sort, params: { id: tasks.first, task: { delta: 1 } }
      tasks_after = Task.all.order('position').pluck(:id)

      expect(tasks_after).to eq tasks_before.reverse
    end
  end

  describe 'PUT #deadline' do
    let!(:project) { create(:project, user_id: subject.current_user.id) }
    let!(:task) { create(:task, project_id: project.id) }

    it 'set deadline' do
      date = 'Mon Apr 18 2015 08:40:00 GMT+0000 (EEST)'
      put :deadline, params: { id: task, task: { deadline: date } }
      task.reload

      expect(task.deadline).to eq date
    end

    it 'cancel deadline' do
      put :deadline, params: { id: task, task: { deadline: nil } }
      task.reload

      expect(task.deadline).to eq nil
    end
  end
end
