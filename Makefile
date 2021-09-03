
build-backend:
	cd damnation_backend && docker build -t wrathofthetyrant/damnation_backend:latest -f Dockerfile .

build-frontend:
	cd damnation_frontend && docker build -t wrathofthetyrant/damnation_frontend:latest -f prod.Dockerfile .

push-backend:
	docker push wrathofthetyrant/damnation_backend:latest

push-frontend:
	docker push wrathofthetyrant/damnation_frontend:latest

build-push-backend: build-backend push-backend

build-push-frontend: build-frontend push-frontend

build-push-all: build-push-backend build-push-frontend
