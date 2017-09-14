class CountriesController < ApplicationController
  before_action :set_country, only: [:show, :edit, :update, :destroy]

  # GET /countries
  # GET /countries.json
  def index
    respond_to do |format|
      format.html
      format.json {
        @countries = Country.all
        render json: @countries
      }
    end
  end

  # GET /countries/1
  # GET /countries/1.json
  def show
    respond_to do |format|
      format.html
      format.json {
        render json: @country
      }
    end
  end

  # GET /countries/new
  def new
    respond_to do |format|
      format.html
      format.json {
        @country = Country.new
      }
    end
  end

  # GET /countries/1/edit
  def edit
    respond_to do |format|
      format.html
      format.json {
        render json: @country
      }
    end
  end

  # POST /countries
  # POST /countries.json
  def create
    @country = Country.new(country_params)

    respond_to do |format|
      if @country.save
        render json:{post: @country, msg: "Audios successfully created", redirect_to: "counries_path"}
      else
        render json: {errors: @country.errors, msg: @country.errors.full_messages.join(', ')}, status: 422
      end
    end
  end

  # PATCH/PUT /countries/1
  # PATCH/PUT /countries/1.json
  def update
    respond_to do |format|
      if @country.update(country_params)
        render json: {post: @country, msg: "Post successfully updated", redirect_to: "countries_path"}
    else
        render json: {errors: @country.errors, msg: @country.errors.full_messages.join(', ')}, status: 422
    end
  end

  # DELETE /countries/1
  # DELETE /countries/1.json
  def destroy
    @country.destroy
    render json: {msg: "Audio successfully deleted", redirect_to: "countries_path"}
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_country
      @country = Country.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def country_params
      params.require(:post).permit(:autor, :description)
    end
  end
end