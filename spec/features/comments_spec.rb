feature 'Comments' do
  let!(:user)    { create(:user) }
  let!(:project) { create(:project, user: user) }
  let!(:task)    { create(:task, project: project) }
  before         { sign_in user }

  scenario 'can create comment with attachment' do
    comment_params = attributes_for(:comment, task: task)
    visit root_path

    find(:css, 'td.task-name').click
    find(:css, '.comment-controller textarea').set(comment_params[:text])
    find('input[name="ajax_upload_file_input"]', visible: false).set(__FILE__)
    find_button('Submit comment').click

    expect(page).to have_css('.comment', count: 1)
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
        expect(page).not_to have_css('.comment')
      end.to change(Comment, :count).by(-1)
    end
  end
end
