require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module ReactTodolist
  class Application < Rails::Application
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.

    # Enable the asset pipeline
    config.assets.enabled = true

    config.browserify_rails.commandline_options = '-t babelify'
    config.browserify_rails.source_map_environments << 'development'
    config.browserify_rails.paths << ->(p) { p.start_with?(Rails.root.join('spec/javascripts').to_s) }
    config.assets.paths << Rails.root.join('node_modules', 'react-datepicker', 'dist')
    config.assets.paths << Rails.root.join('node_modules', 'react-redux-toastr', 'lib', 'css')
  end
end
