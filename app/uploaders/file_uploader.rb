class FileUploader < CarrierWave::Uploader::Base
  include CarrierWave::MiniMagick

  storage :file

  after :remove, :delete_empty_upstream_dirs

  def store_dir
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end

  def cache_dir
    "#{Rails.root}/tmp/uploads"
  end

  def serializable_hash
    {
      url:  url,
      name: file.identifier,
      size: file.size
    }
  end

  def delete_empty_upstream_dirs
    Dir.delete(::File.expand_path(store_dir, root))
  rescue SystemCallError
    true
  end
end
