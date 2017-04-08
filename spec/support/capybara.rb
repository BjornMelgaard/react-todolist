require 'capybara/poltergeist'

if ENV['RSPEC_SELENIUM']
  Capybara.register_driver :selenium_chrome do |app|
    Capybara::Selenium::Driver.new(app, browser: :chrome)
  end
  Capybara.default_driver = :selenium_chrome
  Capybara.javascript_driver = :selenium_chrome
else
  Capybara.default_driver = :poltergeist
  Capybara.javascript_driver = :poltergeist
end

# for email testing
Capybara.server_port = 3001
Capybara.app_host = 'http://localhost:3001'

# Capybara::Webkit.configure do |config|
#   config.block_unknown_urls
#   # config.allow_url('w2.yotpo.com')
#   # config.allow_url('staticw2.yotpo.com')
#   # config.allow_url('fonts.googleapis.com')
# end
