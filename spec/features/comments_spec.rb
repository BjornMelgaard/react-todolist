feature 'Comments' do
  let!(:user)    { create(:user) }
  let!(:project) { create(:project, user: user) }
  let!(:task)    { create(:task, project: project) }
  before         { sign_in user }

  scenario 'can create task' do
    comment_params = attributes_for(:comment, task: task)
    visit root_path

    find(:css, 'td.task-name').click
    find(:css, '.comment-controller textarea').set(comment_params[:text])
    find_button('Submit comment').click
    sleep 0.1

    expect(Comment.count).to eq(1)
  end

  context 'commant exists' do
    let!(:comment) { create(:comment, task: task) }

    before do
      visit root_path
      find(:css, 'td.task-name').click
    end

    scenario 'can delete comment' do
      expect do
        find(:css, '.comment-delete').click
        wait_for_ajax
      end.to change(Comment, :count).by(-1)
    end
  end
end
