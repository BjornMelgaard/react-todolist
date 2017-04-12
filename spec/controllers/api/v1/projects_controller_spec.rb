require 'rails_helper'

RSpec.describe Api::V1::ProjectsController, type: :controller do
  sign_in_user

  it 'should have a current_user' do
    expect(subject.current_user).to_not be_nil
  end

  describe 'POST #create' do
    context 'with valid attributes' do
      it 'creates a project' do
        expect do
          post :create, params: { project: attributes_for(:project) }
        end.to change(Project, :count).by(1)
      end
    end

    context 'with invalid attributes' do
      it 'does not create a project' do
        expect do
          post :create, params: { project: attributes_for(:invalid_project) }
        end.to_not change(Project, :count)
      end

      it 'returns an error' do
        post :create, params: { project: attributes_for(:invalid_project) }
        expect(response.status).to eq 422
      end
    end
  end

  describe 'PATCH #update' do
    context 'with valid attributes' do
      let!(:project) { create(:project, user_id: subject.current_user.id) }
      let(:attributes) { attributes_for(:project, name: 'New project name') }

      it 'does not change projects count' do
        expect do
          patch :update, params: { id: project, project: attributes }
        end.to_not change(Project, :count)
      end

      it 'changes a project name' do
        patch :update, params: { id: project, project: attributes }
        expect(project.reload.name).to eq attributes[:name]
      end
    end

    context 'with invalid attributes' do
      let!(:project) { create(:project, user_id: subject.current_user.id) }
      let(:attributes) { attributes_for(:invalid_project) }

      it 'does not change a project name' do
        patch :update, params: { id: project, project: attributes }
        expect(project.reload.name).to_not eq attributes[:name]
      end

      it 'returns an error' do
        patch :update, params: { id: project, project: attributes }
        expect(response.status).to eq 422
      end
    end
  end

  describe 'DELETE #destroy' do
    let!(:project) { create(:project, user_id: subject.current_user.id) }

    it 'deletes a project' do
      expect do
        delete :destroy, params: { id: project }
      end.to change(Project, :count).by(-1)
    end
  end
end
