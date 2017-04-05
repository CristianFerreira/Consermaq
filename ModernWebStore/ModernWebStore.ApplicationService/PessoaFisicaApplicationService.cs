//using System;
//using System.Collections.Generic;
//using ModernWebStore.Domain.Entities;
//using ModernWebStore.Domain.Repositories;
//using ModernWebStore.Domain.Services;
//using ModernWebStore.Infra.Persistence;

//namespace ModernWebStore.ApplicationService
//{
//    public class PessoaFisicaApplicationService : ApplicationService, IPessoaFisicaApplicationService
//    {
//        private IPessoaFisicaRepository _repository;

//        public PessoaFisicaApplicationService(IPessoaFisicaRepository repository, IUnitOfWork unitOfWork) : base(unitOfWork)
//        {
//            this._repository = repository;
//        }

//        public PessoaFisica Create(PessoaFisica pf)
//        {
//            //pf.Register();
//            _repository.Create(pf);

//            if (Commit())
//                return pf;

//            return null;
//        }

//        public PessoaFisica Delete(int id)
//        {
//            var pf = _repository.Get(id);
//            _repository.Delete(pf);

//            if (Commit())
//                return pf;

//            return null;
//        }

//        public List<PessoaFisica> DeleteAlot(List<PessoaFisica> pessoasfisicas)
//        {
//            var listPF = new List<PessoaFisica>();
//            foreach (var pf in pessoasfisicas)
//            {
//                var pfDelete = _repository.Get(pf.Id);
//                _repository.Delete(pfDelete);

//                if (Commit())
//                    listPF.Add(pfDelete);
//                else
//                    return null;
//            }

//            return listPF;
//        }

//        public List<PessoaFisica> Get()
//        {
//            return _repository.Get();
//        }

//        public PessoaFisica Get(int id)
//        {
//            return _repository.Get(id);
//        }

//        public List<PessoaFisica> Get(int skip, int take)
//        {
//            return _repository.Get(skip, take);
//        }

//        public PessoaFisica Update(PessoaFisica pf)
//        {
//            //pf.Register();
//            _repository.Update(pf);

//            if (Commit())
//                return pf;

//            return null;
//        }
//    }
//}
