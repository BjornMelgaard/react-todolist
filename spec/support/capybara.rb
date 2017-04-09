require 'capybara/poltergeist'

Capybara.register_driver :selenium_chrome do |app|
  Capybara::Selenium::Driver.new(app, browser: :chrome)
end
Capybara.default_driver = :selenium_chrome
Capybara.javascript_driver = :selenium_chrome

# Capybara.register_driver :poltergeist do |app|
#   Capybara::Poltergeist::Driver.new(app, js_errors: false, debug: false)
# end
# # because Error: Native proxies not enabled. use `node --harmony-proxies` to enable them
# Capybara.default_driver = :poltergeist
# Capybara.javascript_driver = :poltergeist

