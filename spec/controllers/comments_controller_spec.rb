require 'rails_helper'

RSpec.describe CommentsController, type: :controller do
  sign_in_user

  it 'should have a current_user' do
    expect(subject.current_user).to_not be_nil
  end

  let!(:project) { create(:project, user_id: subject.current_user.id) }
  let!(:task) { create(:task, project_id: project.id) }

  describe 'POST #create' do
    context 'with valid attributes' do
      it 'adds a comment' do
        expect {
          post :create, params: { comment: attributes_for(:comment, task_id: task.id) }
        }.to change(Comment, :count).by(1)
      end
    end

    context 'with invalid attributes' do
      it 'does not create a comment' do
        expect {
          post :create, params: { comment: attributes_for(:invalid_comment) }
        }.to_not change(Comment, :count)
      end

      it 'returns an error' do
        post :create, params: { comment: attributes_for(:invalid_comment) }
        expect(response.status).to eq 422
      end
    end
  end

  describe 'DELETE #destroy' do
    let!(:comment) { create(:comment, task_id: task.id) }

    it 'deletes a comment' do
      expect {
        delete :destroy, params: { id: comment }
      }.to change(Comment, :count).by(-1)
    end
  end
end
