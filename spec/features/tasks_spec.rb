feature 'Tasks' do
  let!(:user) { create(:user) }
  let!(:project) { create(:project, user: user) }
  before { sign_in user }

  scenario 'can create task' do
    task_params = attributes_for(:task, project: project)
    visit root_path

    find(:css, '.create-task-in input').set(task_params[:name])
    find_button('Add task').click
    sleep 0.1

    expect(Task.count).to eq(1)
  end

  scenario 'can update task' do
    task = create(:task, project: project)
    new_name = 'new name'
    visit root_path

    find(:css, '.task-control button.edit').click
    find(:css, '.task-name textarea.task-name-field').set(new_name + "\n")
    wait_for_ajax
    expect(task.reload.name).to eq new_name
  end

  scenario 'can delete task' do
    task = create(:task, project: project)
    visit root_path
    expect do
      find(:css, '.task-control button.delete').click
      wait_for_ajax
    end.to change(Task, :count).by(-1)
  end
end
