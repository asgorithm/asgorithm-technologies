# asgorithm.com

Next.js 16 + Tailwind 4, built as a static export and served by unprivileged nginx.
There is no Node.js process at runtime.

```sh
npm install
npm run dev          # http://localhost:3000
npm run build        # static site in out/
```

- `app/`, `components/`: the homepage. Copy lives in `lib/content.ts`.
- `public/`: the legacy pages (case studies, service pages, tools) served as-is.
- `k8s/site.yaml`: hardened Deployment, Service, Ingress and NetworkPolicies.

Deploy:

```sh
docker build -t localhost:5000/asgorithm-site:<tag> .
docker push localhost:5000/asgorithm-site:<tag>
KUBECONFIG=~/work/asg/kubeconfig-vpn.yaml kubectl apply -f k8s/site.yaml
```
