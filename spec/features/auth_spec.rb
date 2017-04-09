feature 'Auth' do
  scenario 'An client can register' do
    user_params = attributes_for(:user)
    visit('/users/sign_up')

    within '.new_user' do
      fill_in 'user_email', with: user_params[:email]
      fill_in 'user_password', with: user_params[:password]
      fill_in 'user_password_confirmation', with: user_params[:password]
      find('input.btn').click
    end

    expect(page).to have_content('You have signed up successfully')
  end

  scenario 'An client can sign in' do
    user = create(:user)
    visit('/users/sign_in')

    within '.new_user' do
      fill_in 'user_email', with: user.email
      fill_in 'user_password', with: user.password
      find('input.btn').click
    end

    expect(page).to have_content('Signed in successfully')
  end
end
