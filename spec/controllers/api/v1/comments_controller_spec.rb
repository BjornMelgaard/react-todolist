require 'rails_helper'

RSpec.describe Api::V1::CommentsController, type: :controller do
  sign_in_user

  it 'should have a current_user' do
    expect(subject.current_user).to_not be_nil
  end

  let!(:project) { create(:project, user_id: subject.current_user.id) }
  let!(:task) { create(:task, project_id: project.id) }

  describe 'POST #create' do
    context 'with valid attributes' do
      it 'adds a comment' do
        expect do
          post :create, params: { comment: attributes_for(:comment, task_id: task.id) }
        end.to change(Comment, :count).by(1)
      end
    end

    context 'with invalid attributes' do
      it 'does not create a comment' do
        expect do
          post :create, params: { comment: attributes_for(:invalid_comment) }
        end.to_not change(Comment, :count)
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
      expect do
        delete :destroy, params: { id: comment }
      end.to change(Comment, :count).by(-1)
    end

    it 'comment dont exists' do
      delete :destroy, params: { id: 1001 }
      expect(response).to have_http_status(:not_found)
    end

    it 'not owner' do
      comment = create :comment
      delete :destroy, params: { id: comment.id }
      expect(response).to have_http_status(:unauthorized)
    end
  end
end
